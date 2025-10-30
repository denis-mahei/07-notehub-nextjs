'use client'

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div style={{
            padding: '20px',
            textAlign: 'center',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h2 style={{ color: '#dc3545', marginBottom: '16px' }}>
                Something went wrong!
            </h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                Failed to load the note. Please try again.
            </p>
            <button
                onClick={reset}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Try again
            </button>
        </div>
    )
}