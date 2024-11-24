import { cn } from '@/lib/utils'
import { useConfigDispatch } from '@components/App/Config/utils.tsx'
import '@components/Layout/components/HeaderHome.css'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Fuse, { type FuseResult } from 'fuse.js'
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { back, forward } from './back-forward-autocomplete.ts'

const list = [
  { keyword: '@home', type: 'page', to: '/' },
  { keyword: '@blog', type: 'page', to: '/blog' },
  { keyword: '@package-analysis', type: 'page', to: '/package-analysis' },
  { keyword: '@analytics', type: 'page', to: '/analytics' },
  { keyword: '@deploy', type: 'page', to: '/deploy' },
]

function HeaderHome() {
  const dispatch = useConfigDispatch()
  const [autoComplete, setAutoComplete] = useState({
    inputValue: '',
    focusIndex: -1,
    results: [] as FuseResult<{
      keyword: string
      type: string
      to: string
    }>[],
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(false)

  const fuse = useMemo(
    () => new Fuse(list, { keys: ['keyword'], includeScore: true }),
    []
  )
  const { inputValue, focusIndex, results } = autoComplete

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAutoComplete((prev) => ({
      ...prev,
      inputValue: value,
      results: fuse.search(value.trim()),
    }))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setAutoComplete((prev) => {
        const focusIndex = forward(prev.focusIndex, prev.results)
        const inputValue = prev.results[focusIndex].item.keyword
        return {
          ...prev,
          focusIndex,
          inputValue,
        }
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setAutoComplete((prev) => {
        const focusIndex = back(prev.focusIndex, prev.results)
        const inputValue = prev.results[focusIndex].item.keyword
        return {
          ...prev,
          focusIndex,
          inputValue,
        }
      })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (!inputRef.current) {
        return
      }
      const { focusIndex } = autoComplete
      if (focusIndex > -1 && focusIndex < autoComplete.results.length) {
        inputRef.current.focus()
        setHidden(true)
        navigate(autoComplete.results[focusIndex].item.to)
      }
    } else if (e.key === 'Escape') {
      setHidden(true)
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('inspect.click', e.target)
    if (!inputRef.current) {
      return
    }
    if (
      e.target instanceof HTMLDivElement &&
      e.target.classList.contains('autocomplete-item')
    ) {
      console.log('inspect.index', e.target.dataset.index)
      const newIndex = parseInt(e.target.dataset.index as string)
      const newInputValue = results[newIndex].item.keyword
      setAutoComplete((prev) => {
        return {
          ...prev,
          inputValue: newInputValue,
          focusIndex: newIndex,
        }
      })
      inputRef.current.focus()
      setHidden(true)
      navigate(results[newIndex].item.to)
    }
  }
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    setHidden(false)
  }

  return (
    <header className='app-header-home'>
      <div className='header-input tuy-bien-focus-visible-input autocomplete'>
        <div className='input-wrapper'>
          <input
            ref={inputRef}
            type='text'
            placeholder='Tìm kiếm...'
            className='input'
            value={autoComplete.inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleInput}
            onFocus={handleFocus}
          />
          <button
            className='end-adornment tuy-bien-focus-visible'
            onClick={() => dispatch({ type: 'toggle' })}
          >
            <HamburgerMenuIcon />
          </button>
        </div>

        {results.length > 0 && (
          <div className={cn('autocomplete-items', { hidden })}>
            {results.length && <div className='line' />}
            {results.map((res, index) => {
              return (
                <div
                  key={res.item.keyword}
                  className={cn(
                    'autocomplete-item',
                    index === autoComplete.focusIndex
                      ? 'autocomplete-active'
                      : ''
                  )}
                  data-index={index}
                  onClick={handleClick}
                >
                  {res.item.keyword}
                  <input type='hidden' value={res.item.keyword} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}

export default HeaderHome
