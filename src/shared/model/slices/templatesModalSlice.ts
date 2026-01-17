import { createSlice } from '@reduxjs/toolkit'

interface TemplatesModalState {
  isOpen: boolean
}

const initialState: TemplatesModalState = {
  isOpen: false
}

const templatesModalSlice = createSlice({
  name: 'templatesModal',
  initialState,
  reducers: {
    openTemplatesModal: (state) => {
      state.isOpen = true
    },
    closeTemplatesModal: (state) => {
      state.isOpen = false
    }
  }
})

export const { openTemplatesModal, closeTemplatesModal } = templatesModalSlice.actions
export default templatesModalSlice.reducer
