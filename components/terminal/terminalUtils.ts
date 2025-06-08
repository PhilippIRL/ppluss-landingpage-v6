export const SHELL_PROMPT = '# '

export function getBrandString() {
    return 'PplusS Landing Page v6 (' + process.env.NEXT_PUBLIC_APP_VERSION + ')'
}

export function focusField(input: HTMLInputElement | null | undefined) {
    if(!input) return

    input.focus()
    input.selectionStart = input.selectionEnd = input.value.length // fuck safari
}
