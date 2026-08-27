import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AdminAuthService,
  type AdminFeedbackListItem,
  type FeedbackDraft,
} from '../../core/auth/admin-auth.service';

type FeedbackStatus = FeedbackDraft['status'];

@Component({
  selector: 'app-admin-feedback-list-page',
  imports: [FormsModule],
  templateUrl: './admin-feedback-list-page.component.html',
  styleUrl: './admin-feedback-list-page.component.scss',
})
export class AdminFeedbackListPageComponent implements OnInit {
  readonly auth = inject(AdminAuthService);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly feedbacks = signal<readonly AdminFeedbackListItem[]>([]);
  readonly editingFeedback = signal<AdminFeedbackListItem | null>(null);
  readonly isCreating = signal(false);
  readonly saving = signal(false);
  readonly deletingId = signal<string | null>(null);
  readonly movingId = signal<string | null>(null);
  readonly saveError = signal<string | null>(null);

  draft: FeedbackDraft = this.emptyDraft();

  async ngOnInit(): Promise<void> {
    try {
      this.feedbacks.set(await this.auth.listFeedbacks());
    } catch {
      this.error.set(
        'Não foi possível carregar os feedbacks. Atualize a página e tente novamente.',
      );
    } finally {
      this.loading.set(false);
    }
  }

  startCreate(): void {
    this.resetEditor();
    this.isCreating.set(true);
    this.draft = this.emptyDraft();
  }

  openEdit(feedback: AdminFeedbackListItem): void {
    this.resetEditor();
    this.editingFeedback.set(feedback);
    this.draft = {
      author: feedback.author,
      text: feedback.text,
      status: feedback.status,
      sort_order: feedback.sort_order,
    };
  }

  closeEditor(): void {
    this.resetEditor();
    this.draft = this.emptyDraft();
  }

  setStatus(status: FeedbackStatus): void {
    this.draft.status = status;
  }

  async saveFeedback(): Promise<void> {
    const draft = this.normalizedDraft();
    this.saveError.set(null);
    if (!this.isDraftValid(draft)) return;

    this.saving.set(true);
    try {
      if (this.isCreating()) {
        const created = await this.auth.createFeedback(draft);
        this.feedbacks.update((feedbacks) => [...feedbacks, created]);
      } else {
        const feedback = this.editingFeedback();
        if (!feedback) return;
        const updated = await this.auth.updateFeedback(feedback.id, draft);
        this.feedbacks.update((feedbacks) =>
          feedbacks.map((current) => (current.id === updated.id ? updated : current)),
        );
      }
      this.closeEditor();
    } catch (error) {
      console.error('Falha ao salvar feedback:', error);
      this.saveError.set('Não foi possível salvar o feedback. Revise os dados e tente novamente.');
    } finally {
      this.saving.set(false);
    }
  }

  async toggleStatus(feedback: AdminFeedbackListItem): Promise<void> {
    const nextStatus: FeedbackStatus = feedback.status === 'published' ? 'draft' : 'published';
    try {
      const updated = await this.auth.updateFeedback(feedback.id, {
        author: feedback.author,
        text: feedback.text,
        status: nextStatus,
        sort_order: feedback.sort_order,
      });
      this.feedbacks.update((feedbacks) =>
        feedbacks.map((current) => (current.id === updated.id ? updated : current)),
      );
    } catch (error) {
      console.error('Falha ao alterar status do feedback:', error);
      this.error.set('Não foi possível alterar a visibilidade do feedback.');
    }
  }

  async deleteFeedback(feedback: AdminFeedbackListItem): Promise<void> {
    this.deletingId.set(feedback.id);
    this.error.set(null);
    try {
      await this.auth.deleteFeedback(feedback.id);
      const remaining = this.feedbacks().filter((current) => current.id !== feedback.id);
      this.feedbacks.set(
        remaining.map((current, sortOrder) => ({ ...current, sort_order: sortOrder })),
      );
      await this.auth.reorderFeedbacks(remaining.map((current) => current.id));
      if (this.editingFeedback()?.id === feedback.id) this.closeEditor();
    } catch (error) {
      console.error('Falha ao apagar feedback:', error);
      this.error.set('Não foi possível apagar o feedback. Tente novamente.');
    } finally {
      this.deletingId.set(null);
    }
  }

  async moveFeedback(feedbackId: string, direction: -1 | 1): Promise<void> {
    const feedbacks = this.feedbacks();
    const index = feedbacks.findIndex((feedback) => feedback.id === feedbackId);
    const destination = index + direction;
    if (index < 0 || destination < 0 || destination >= feedbacks.length) return;

    this.movingId.set(feedbackId);
    this.error.set(null);
    const reordered = [...feedbacks];
    [reordered[index], reordered[destination]] = [reordered[destination], reordered[index]];
    try {
      await this.auth.reorderFeedbacks(reordered.map((feedback) => feedback.id));
      this.feedbacks.set(
        reordered.map((feedback, sortOrder) => ({ ...feedback, sort_order: sortOrder })),
      );
    } catch (error) {
      console.error('Falha ao reordenar feedbacks:', error);
      this.error.set('Não foi possível alterar a ordem dos feedbacks.');
    } finally {
      this.movingId.set(null);
    }
  }

  statusLabel(status: FeedbackStatus): string {
    return status === 'published' ? 'Publicado' : 'Oculto';
  }

  private normalizedDraft(): FeedbackDraft {
    return {
      author: this.draft.author.trim(),
      text: this.draft.text.trim(),
      status: this.draft.status,
      sort_order: this.isCreating() ? this.feedbacks().length : this.draft.sort_order,
    };
  }

  private isDraftValid(draft: FeedbackDraft): boolean {
    if (!draft.author || !draft.text) {
      this.saveError.set('Preencha autor e texto antes de salvar.');
      return false;
    }
    if (draft.text.length > 240) {
      this.saveError.set('Mantenha o feedback com até 240 caracteres.');
      return false;
    }
    return true;
  }

  private resetEditor(): void {
    this.editingFeedback.set(null);
    this.isCreating.set(false);
    this.saveError.set(null);
  }

  private emptyDraft(): FeedbackDraft {
    return {
      author: '',
      text: '',
      status: 'draft',
      sort_order: this.feedbacks().length,
    };
  }
}
