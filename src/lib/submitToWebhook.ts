import { MAKE_WEBHOOK_URL, N8N_WEBHOOK_URL } from './config';
import { ContactFormData } from './contactSchema';

interface WebhookPayload extends ContactFormData {
  timestamp: string;
  sourcePage: string;
}

interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitToWebhook(data: ContactFormData): Promise<SubmitResult> {
  const webhookUrl = MAKE_WEBHOOK_URL || N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      success: false,
      error: 'No webhook configured. Please contact me directly via email.',
    };
  }

  const payload: WebhookPayload = {
    ...data,
    timestamp: new Date().toISOString(),
    sourcePage: window.location.href,
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors',
    });

    // With no-cors mode, we can't read the response, but the request was sent
    return { success: true };
  } catch (error) {
    console.error('Webhook submission error:', error);
    return {
      success: false,
      error: 'Failed to send your request. Please try emailing me directly.',
    };
  }
}
