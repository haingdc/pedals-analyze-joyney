import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import "./SearchButton.css"

const SearchButton: React.FunctionComponent = () => {
  return (
    <div className="search-box">
      <div className="text-field">
        <input
          type="text"
          aria-label="Search"
          placeholder=" "
          autoComplete="off"
          tabIndex={0}
          // className="is_focus"
        />
        <MagnifyingGlassIcon className="search-button" />
      </div>
      <div className="results">
        <ul>
          <li>
            <a href="${action.link}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-checklist"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
                <path d="M14 19l2 2l4 -4" />
                <path d="M9 8h4" />
                <path d="M9 12h2" />
              </svg>
              New Document
            </a>
          </li>
          <li>
            <a href="${action.link}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-checklist"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
                <path d="M14 19l2 2l4 -4" />
                <path d="M9 8h4" />
                <path d="M9 12h2" />
              </svg>
              New Document
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SearchButton
