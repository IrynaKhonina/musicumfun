import { useFetchTracksInfiniteQuery } from '../../api/tracksApi.ts'
import s from './TracksPage.module.css'
import {useCallback, useEffect, useRef} from "react";
export const TracksPage = () => {
    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useFetchTracksInfiniteQuery()

    // Создает ссылку на DOM элемент, который будет "триггером" для автозагрузки
    const observerRef = useRef<HTMLDivElement>(null)

    const pages = data?.pages.flatMap(page => page.data) || []

    const loadMoreHandler = useCallback(() => {
        if (hasNextPage && !isFetching) {
            fetchNextPage()
        }
    }, [hasNextPage, isFetching, fetchNextPage])

    useEffect(() => {
        // IntersectionObserver отслеживает элементы и сообщает, насколько они видны во viewport
        // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        const observer = new IntersectionObserver(
            entries => {
                // entries - наблюдаемый элемент
                if (entries.length > 0 && entries[0].isIntersecting) {
                    loadMoreHandler()
                }
            },
            {
                root: null, // Отслеживание относительно окна браузера (viewport). null = весь экран
                rootMargin: '100px', // Начинать загрузку за 100px до появления элемента
                threshold: 0.1, // Срабатывать когда 10% элемента становится видимым
            }
        )

        const currentObserverRef = observerRef.current
        if (currentObserverRef) {
            // начинает наблюдение за элементом
            observer.observe(currentObserverRef)
        }

        // Функция очистки - прекращает наблюдение при размонтировании компонента
        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef)
            }
        }
    }, [loadMoreHandler])

    return (
        <div>
            <h1>Tracks page</h1>
            <div className={s.list}>
                {pages.map(track => {
                    const { title, user, attachments } = track.attributes

                    return (
                        <div key={track.id} className={s.item}>
                            <div>
                                <p>Title: {title}</p>
                                <p>Name: {user.name}</p>
                            </div>
                            {attachments.length ? <audio controls src={attachments[0].url} /> : 'no file'}
                        </div>
                    )
                })}
            </div>

            {hasNextPage && (
                // Этот элемент отслеживается IntersectionObserver
                <div ref={observerRef}>
                    {/*`<div style={{ height: '20px' }} />` создает "невидимую зону" в 20px в конце списка,*/}
                    {/*при достижении которой автоматически загружаются новые треки. Без размеров*/}
                    {/*IntersectionObserver не будет работать корректно.*/}
                    {isFetchingNextPage ? (
                        <div>Loading more tracks...</div>
                    ) : (
                        <div style={{ height: '20px' }} />
                    )}
                </div>
            )}

            {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
        </div>
    )
}