/* Синтаксис error is { error: string } означает, что если функция возвращает true, TypeScript будет рассматривать
error как объект с обязательным строковым свойством error. */

export function isErrorWithError (error: unknown): error is { error: string } {
    return (
        typeof error === 'object' && // Проверяем, что error – это объект
        error != null && // Убеждаемся, что это не null
        'error' in error && // Проверяем, что у объекта есть свойство 'error'
        typeof (error as Record<string, unknown>).error === 'string' // Убеждаемся, что это строка
    )
}