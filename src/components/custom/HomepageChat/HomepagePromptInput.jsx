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
import { IconBrandGoogle } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';



// optional: safe logger that reads attachments *inside* the PromptInput tree
function AttachmentsLogger() {
    const attachments = usePromptInputAttachments();
    useEffect(() => {
        console.log('attachments:', attachments);
    }, [attachments]);
    return null;
}

export function HomepagePromptInput({
    input,
    setInput,
    placeholder = 'Ask Planwise AI...',
    //   onSubmit,
}) {
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

    return (
        <PromptInput
            onSubmit={(message) => {
                // onSubmit?.(message);
                // if (message.text) setInput('');
            }}
            globalDrop={true}
            className="mt-4 relative shadow-[0_0_7px_1px_rgba(0,0,0,0.1)] w-full border-0"
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
                        <PromptInputActionMenuTrigger />
                        <PromptInputActionMenuContent className="rounded-2xl">
                            <PromptInputActionAddAttachments className="rounded-2xl" label="Add Image" />
                        </PromptInputActionMenuContent>
                    </PromptInputActionMenu>
                </PromptInputTools>

                <Button className="w-[28px] h-[28px] p-0 bg-gradient-to-br from-sky-300 via-indigo-400 to-violet-600 text-white">
                    <ArrowUp className='h-max'/>
                </Button>
                {/* <PromptInputSubmit disabled={false} status="ready" /> */}
            </PromptInputToolbar>
        </PromptInput>
    );
}
