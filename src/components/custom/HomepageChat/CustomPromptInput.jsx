'use client';

import { useEffect, useState } from 'react';
import {
    PromptInput,
    PromptInputActionAddAttachments,
    PromptInputActionMenu,
    PromptInputActionMenuContent,
    PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
    usePromptInputAttachments,
} from '@/components/ai-elements/prompt-input';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { ShineBorder } from '@/components/ui/shine-border'
import { BorderBeam } from '@/components/magicui/border-beam'
import { useTheme } from 'next-themes';




// optional: safe logger that reads attachments *inside* the PromptInput tree
function AttachmentsLogger() {
    const attachments = usePromptInputAttachments();
    useEffect(() => {
        console.log('attachments:', attachments);
    }, [attachments]);
    return null;
}

export function CustomPromptInput({
    input,
    setInput,
    placeholder = 'Ask Planwise AI...',
    //   onSubmit,
}) {
    const {resolvedTheme, setTheme} = useTheme()
    const [typedPlaceholder, setTypedPlaceholder] = useState('');

    useEffect(() => {
        if (!placeholder) {
            setTypedPlaceholder('');
            return;
        }
        setTypedPlaceholder('');
        let i = 0;
        const id = window.setInterval(() => {
            i += 1;
            setTypedPlaceholder(placeholder.slice(0, i));
            if (i >= placeholder.length) window.clearInterval(id);
        }, 100);
        return () => window.clearInterval(id);
    }, [placeholder]);

    const lightModeBorder = resolvedTheme === 'dark' ? '#222124' : 'white'

    return (
        <PromptInput
            onSubmit={(message) => {
                // onSubmit?.(message);
                // if (message.text) setInput('');
            }}
            globalDrop={true}
            className="mt-4 relative overflow-hidden dark:bg-[#222124] shadow-[0_0_7px_1px_rgba(0,0,0,0.1)] w-full border-0"
        >
            <PromptInputBody>
                <AttachmentsLogger />

                <PromptInputAttachments>
                    {(attachment) => <PromptInputAttachment data={attachment} />}
                </PromptInputAttachments>

                <PromptInputTextarea
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    placeholder={typedPlaceholder}
                />
            </PromptInputBody>

            <PromptInputToolbar className="border-0 px-3 py-2">
                <PromptInputTools className="">
                    <PromptInputActionMenu className="">
                        <PromptInputActionMenuTrigger className="dark:text-white focus-visible:ring-offset-0 focus-visible:ring-0" />
                        <PromptInputActionMenuContent className="rounded-2xl dark:bg-stone-800 dark:border-stone-700/60">
                            <PromptInputActionAddAttachments className="rounded-2xl dark:hover:bg-[#292929]  dark:text-white" label="Add Image" />
                            <DropdownMenuItem>
                                <img src="/google-icon-logo-svgrepo-com.svg" alt="Google" className="h-5 w-5 mr-1" />
                                Fetch Google Events
                            </DropdownMenuItem>
                        </PromptInputActionMenuContent>
                    </PromptInputActionMenu>
                </PromptInputTools>

                <Button className="w-[28px] h-[28px] p-0 bg-gradient-to-br from-sky-300 via-indigo-400 to-violet-600 text-white">
                    <ArrowUp className='h-max' />
                </Button>
                {/* <PromptInputSubmit disabled={false} status="ready" /> */}
            </PromptInputToolbar>
            <ShineBorder
                className="opacity-80"
                borderWidth={1.5}
                duration={60}
                // shineColor={[
                //     'rgba(56,189,248,0.12)',
                //     'rgba(129,140,248,0.18)',
                //     'rgba(192,132,252,0.22)'
                // ]}

                shineColor={[
                    // 'white',
                    '#7c3aed',
                    // lightModeBorder,
                    '#7dd3fc',
                    // lightModeBorder,
                    // lightModeBorder,
                    // 'white',
                ]}
            />
        </PromptInput>

    );
}
