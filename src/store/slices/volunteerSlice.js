import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import volunteerService from '../../db/volunteerService'

export const submitVolunteer = createAsyncThunk(
  'volunteer/submitVolunteer',
  async (formData, { rejectWithValue }) => {
    const emailExists = await volunteerService.emailExists(formData.email)
    if (emailExists) {
      return rejectWithValue({ message: 'This email has already been used to submit an application.' })
    }
    const result = await volunteerService.addVolunteer(formData)
    return result
  }
)

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occupation: '',
    skills: [],
    availability: '',
    experience: '',
    motivation: '',
  },
  isSubmitted: false,
  isSubmitting: false,
  errors: {},
  submitError: null,
}

const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload
      state.formData[field] = value
    },
    toggleSkill: (state, action) => {
      const skill = action.payload
      const index = state.formData.skills.indexOf(skill)
      if (index === -1) {
        state.formData.skills.push(skill)
      } else {
        state.formData.skills.splice(index, 1)
      }
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload }
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload
    },
    setSubmitted: (state, action) => {
      state.isSubmitted = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    clearSubmitError: (state) => {
      state.submitError = null
    },
    resetForm: (state) => {
      state.formData = initialState.formData
      state.isSubmitted = false
      state.isSubmitting = false
      state.errors = {}
      state.submitError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitVolunteer.pending, (state) => {
        state.isSubmitting = true
        state.submitError = null
      })
      .addCase(submitVolunteer.fulfilled, (state) => {
        state.isSubmitting = false
        state.isSubmitted = true
        state.formData = initialState.formData
      })
      .addCase(submitVolunteer.rejected, (state, action) => {
        state.isSubmitting = false
        state.submitError = action.payload?.message || 'Failed to submit application'
      })
  },
})

export const {
  updateField,
  toggleSkill,
  setFormData,
  setSubmitting,
  setSubmitted,
  setErrors,
  clearSubmitError,
  resetForm,
} = volunteerSlice.actions

export default volunteerSlice.reducer
