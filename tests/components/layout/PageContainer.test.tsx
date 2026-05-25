import { render, screen } from '@testing-library/react';
import { PageContainer } from '@/components/layout/PageContainer';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

describe('PageContainer Component', () => {
  it('renders children content', () => {
    render(
      <PageContainer>
        <div data-testid="child-content">Test Content</div>
      </PageContainer>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders title and description when provided', () => {
    render(
      <PageContainer
        title="Test Title"
        description="Test Description"
      >
        <div>Content</div>
      </PageContainer>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <PageContainer actions={<button data-testid="action-button">Action</button>}>
        <div>Content</div>
      </PageContainer>
    );

    expect(screen.getByTestId('action-button')).toBeInTheDocument();
  });
});