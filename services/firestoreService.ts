import { db, firebase } from './firebaseConfig';
import { Message } from '../types';
import { arrayUnion } from 'firebase/firestore';

/**
 * Updates the chat history for a specific analysis document in Firestore.
 * @param userId The UID of the authenticated user.
 * @param analysisId The ID of the analysis document to update.
 * @param newMessages An array of new message objects to append to the history.
 */
export const updateChatHistory = async (
    userId: string, 
    analysisId: string, 
    newMessages: Message[]
): Promise<void> => {
    if (!userId || !analysisId || newMessages.length === 0) {
        console.warn("Update chat history called with invalid arguments.");
        return;
    }

    const analysisRef = db.collection('users').doc(userId).collection('analyses').doc(analysisId);
    
    try {
        await analysisRef.update({
            chatHistory: arrayUnion(...newMessages)
        });
    } catch (error) {
        console.error("Error updating chat history in Firestore:", error);
        // In a production app, you might want to report this error to a logging service.
    }
};
