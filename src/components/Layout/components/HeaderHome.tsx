import { useState, useRef } from 'react'
import { useConfigDispatch } from '@components/App/Config/utils.tsx'
import '@components/Layout/components/HeaderHome.css'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Fuse, { type FuseResult } from 'fuse.js'
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom";

const list = [
  { keyword: '@home', type: 'page', to: '/' },
  { keyword: '@blog', type: 'page', to: '/blog' },
  { keyword: '@package-analysis', type: 'page', to: '/package-analysis' },
  { keyword: '@analytics', type: 'page', to: '/analytics' },
  { keyword: '@deploy', type: 'page', to: '/deploy' },
]

function HeaderHome() {
  const dispatch = useConfigDispatch()
  const [inputValue, setInputValue] = useState('')
  const [focusIndex, setFocusIndex] = useState(-1)
  const [results, setResult] = useState<FuseResult<{
    keyword: string,
    type: string,
    to: string
  }>[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (!value.trim()) {
      setResult([])
      return
    }
    const fuse = new Fuse(list, {
      keys: ['keyword'],
      includeScore: true,
    })
    const result = fuse.search(value.trim())
    console.log('inspect.result' , result)

    setResult(result)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setFocusIndex((prevIndex) => prevIndex + 1)
    } else if (e.key === 'ArrowUp') {
      setFocusIndex((prevIndex) => prevIndex - 1)
    } else if (e.key === 'Enter') {
      if (!inputRef.current) {
        return
      }
      e.preventDefault()
      if (focusIndex > -1) {
        setInputValue(results[focusIndex].item.keyword)
        setFocusIndex(-1)
        inputRef.current.focus()
        setResult([])
        console.log('inspect.focusIndex', { focusIndex, item: results[focusIndex].item })
        navigate(results[focusIndex].item.to)
      }
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('inspect.click', e.target)
    if (!inputRef.current) {
      return
    }
    if (e.target instanceof HTMLDivElement && e.target.classList.contains('autocomplete-item')) {
      console.log('inspect.index', e.target.dataset.index)
      const newIndex = parseInt(e.target.dataset.index as string)
      setFocusIndex(-1)
      setInputValue(results[newIndex].item.keyword)
      inputRef.current.focus()
      setResult([])
    }
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
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleInput}
          />
          <button
            className='end-adornment tuy-bien-focus-visible'
            onClick={() => dispatch({ type: 'toggle' })}
          >
            <HamburgerMenuIcon />
          </button>
        </div>

        {results.length > 0 && (
          <div id='myInputautocomplete-list' className='autocomplete-items'>
            {results.map((res, index) => {
              return (
                <div
                  key={res.item.keyword}
                  className={cn('autocomplete-item', index === focusIndex ? 'autocomplete-active' : '')}
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
