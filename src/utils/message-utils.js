import { makeId } from "@/services/util.service";

/**
 * Convert UIMessage to database format
 * @param {Object} message - Message in UI format
 * @returns {Object} Message in database format
 */
export const toDB = (message) => ({
    id: message.id,
    type: message.role === 'user' ? 'user' : 'assistant',
    text: message.parts
        .filter(p => p.type === 'text')
        .map(p => p.text)
        .join(''),
    timestamp: message.metadata?.timestamp,
});

/**
 * Convert database format to UIMessage
 * @param {Object} record - Message in database format
 * @returns {Object} Message in UI format
 */
export const fromDB = (record) => ({
    id: record.id,
    role: record.type === 'user' ? 'user' : 'assistant',
    parts: [{ type: 'text', text: record.text }],
    metadata: { timestamp: record.timestamp }
});

/**
 * Convert an array of messages to UIMessage format
 * @param {Array} messages - Array of messages in database format
 * @returns {Array} Array of messages in UI format
 */
export const convertMessagesToUIFormat = (messages) => {
    if (!messages || !Array.isArray(messages)) return [];
    return messages.map(msg => fromDB({
        id: msg.id || makeId(10),
        type: msg.type,
        text: msg.text,
        timestamp: msg.timestamp || new Date().toISOString()
    }));
};
