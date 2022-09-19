export default function Button({ onClick, disabled }) {
    return (
        <Button 
            aria-label="Previous and next"
            onClick={() => onClick()} disabled={disabled}> 
        </Button>
    )
}
