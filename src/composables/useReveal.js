import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Fades an element in (translateY + opacity) once it becomes 15% visible.
 * @param {{ delay?: number }} [opts]
 */
export function useReveal(opts = {}) {
  const el = ref(null)
  let observer

  onMounted(() => {
    if (!el.value) return
    if (opts.delay) el.value.style.transitionDelay = `${opts.delay}ms`

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { el }
}
