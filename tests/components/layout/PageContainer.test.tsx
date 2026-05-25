import { render, screen } from '@testing-library/react';
import { PageContainer } from '@/components/layout/PageContainer';

describe('PageContainer Component', () => {
  it('renders children content', () => {
    render(
      <PageContainer>
        <div data-testid="child-content">Test Content</div>
      </PageContainer>
    )
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
  })

  it('renders title and description when provided', () => {
    render(
      <PageContainer title="Test Title" description="Test Description">
        <div>Content</div>
      </PageContainer>
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders actions when provided', () => {
    render(
      <PageContainer actions={<button data-testid="action-button">Action</button>}>
        <div>Content</div>
      </PageContainer>
    )
    expect(screen.getByTestId('action-button')).toBeInTheDocument()
  })

  it('applies additional className when provided', () => {
    const { container } = render(
      <PageContainer className="custom-class">
        <div>Content</div>
      </PageContainer>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has proper animation properties', () => {
    const { container } = render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    )
    const motionDiv = container.firstChild
    expect(motionDiv).toHaveAttribute('data-framer-motion')
  })
})
