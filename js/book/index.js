import { memo } from 'react'
import { Provider } from './reducer'
import BookEventListener from './containers/BookEventListener'
import BookButtons from './containers/BookButtons'
import BookTable from './containers/BookTable'
import BookModal from './containers/BookModal'

const BookRoute = memo(() => (
  <Provider>
    <>
      <BookEventListener />
      <BookButtons />
      <BookTable />
      <BookModal />
    </>
  </Provider>
))

export default BookRoute
