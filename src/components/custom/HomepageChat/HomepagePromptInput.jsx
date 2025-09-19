import {
    PromptInput,
    PromptInputActionAddAttachments,
    PromptInputActionMenu,
    PromptInputActionMenuContent,
    PromptInputActionMenuItem,
    PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputButton,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
    usePromptInputAttachments,
  } from '@/components/ai-elements/prompt-input';

export function HomepagePromptInput({input, setInput}) {

    function handleChange({target}) {
        console.log(target.text);
        
        setInput(target.text)
    }
    return (
        <PromptInput  onSubmit={() => { }} className="mt-4 relative shadow-[0_0_7px_1px_rgba(0,0,0,0.1)] w-full border-0">
            <PromptInputBody>
                <PromptInputAttachments>
                    {(attachment) => (
                        <PromptInputAttachment data={attachment} />
                    )}
                </PromptInputAttachments>
                <PromptInputTextarea onChange={handleChange}  value={input} />
            </PromptInputBody>
            <PromptInputToolbar className="border-0">
                <PromptInputTools>
                    <PromptInputActionMenu>
                        <PromptInputActionMenuTrigger />
                        <PromptInputActionMenuContent>
                            <PromptInputActionAddAttachments />
                        </PromptInputActionMenuContent>
                    </PromptInputActionMenu>
                </PromptInputTools>
                <PromptInputSubmit
                    disabled={false}
                    status={'ready'}
                />
            </PromptInputToolbar>
        </PromptInput>
    )
}