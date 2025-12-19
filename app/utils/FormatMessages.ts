import type { IMessage } from "@/models/Message";

interface FormattedMessage {
    role: 'user' | 'assistant';
    content: string;
}

export function formatMessages(messages: IMessage[]): string {
    const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));

    return JSON.stringify(formattedMessages);
}