import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AdminAuthService } from '../../core/auth/admin-auth.service';
import { AdminFeedbackListPageComponent } from './admin-feedback-list-page.component';

describe('AdminFeedbackListPageComponent', () => {
  const feedbacks = [
    {
      id: 'feedback-1',
      author: 'Carlos Mendes',
      text: 'A curadoria deixou a compra muito mais objetiva.',
      status: 'published' as const,
      sort_order: 0,
    },
    {
      id: 'feedback-2',
      author: 'Marina Costa',
      text: 'Processo claro e cuidadoso até a entrega.',
      status: 'draft' as const,
      sort_order: 1,
    },
  ];

  const setup = async () => {
    const auth = {
      listFeedbacks: vi.fn().mockResolvedValue(feedbacks),
      createFeedback: vi.fn().mockResolvedValue({
        id: 'feedback-3',
        author: 'João Lima',
        text: 'Escolha segura.',
        status: 'published' as const,
        sort_order: 2,
      }),
      updateFeedback: vi.fn().mockImplementation((_id, draft) =>
        Promise.resolve({
          id: _id,
          ...draft,
        }),
      ),
      deleteFeedback: vi.fn().mockResolvedValue(undefined),
      reorderFeedbacks: vi.fn().mockResolvedValue(undefined),
    };
    await TestBed.configureTestingModule({
      imports: [AdminFeedbackListPageComponent],
      providers: [{ provide: AdminAuthService, useValue: auth }, provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(AdminFeedbackListPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { auth, fixture };
  };

  afterEach(() => TestBed.resetTestingModule());

  it('loads feedbacks for the admin view', async () => {
    const { auth, fixture } = await setup();

    expect(auth.listFeedbacks).toHaveBeenCalledOnce();
    expect(fixture.componentInstance.feedbacks()).toHaveLength(2);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Carlos Mendes');
  });

  it('blocks saving without author and text', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    component.startCreate();

    await component.saveFeedback();

    expect(auth.createFeedback).not.toHaveBeenCalled();
    expect(component.saveError()).toContain('autor e texto');
  });

  it('creates a feedback at the end of the current order', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    component.startCreate();
    component.draft = {
      author: 'João Lima',
      text: 'Escolha segura.',
      status: 'published',
      sort_order: 0,
    };

    await component.saveFeedback();

    expect(auth.createFeedback).toHaveBeenCalledWith({
      author: 'João Lima',
      text: 'Escolha segura.',
      status: 'published',
      sort_order: 2,
    });
    expect(component.feedbacks()[2].id).toBe('feedback-3');
  });

  it('edits an existing feedback', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;
    component.openEdit(feedbacks[0]);
    component.draft.text = 'Compra muito mais objetiva.';

    await component.saveFeedback();

    expect(auth.updateFeedback).toHaveBeenCalledWith(
      'feedback-1',
      expect.objectContaining({ text: 'Compra muito mais objetiva.' }),
    );
  });

  it('publishes and hides directly from the list', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;

    await component.toggleStatus(feedbacks[1]);

    expect(auth.updateFeedback).toHaveBeenCalledWith(
      'feedback-2',
      expect.objectContaining({ status: 'published' }),
    );
  });

  it('reorders feedbacks manually', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;

    await component.moveFeedback('feedback-2', -1);

    expect(auth.reorderFeedbacks).toHaveBeenCalledWith(['feedback-2', 'feedback-1']);
    expect(component.feedbacks().map((feedback) => feedback.id)).toEqual([
      'feedback-2',
      'feedback-1',
    ]);
  });

  it('deletes feedbacks and normalizes the remaining order', async () => {
    const { auth, fixture } = await setup();
    const component = fixture.componentInstance;

    await component.deleteFeedback(feedbacks[0]);

    expect(auth.deleteFeedback).toHaveBeenCalledWith('feedback-1');
    expect(auth.reorderFeedbacks).toHaveBeenCalledWith(['feedback-2']);
    expect(component.feedbacks()).toEqual([{ ...feedbacks[1], sort_order: 0 }]);
  });
});
