import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider
} from 'firebase/auth'
import { authService } from '~/firebase/fbase'

interface UserStateTypes {
  loading: boolean
  userData: {
    name?: string
    email: string
    userImage?: string
    uid: string
    timeStamp: number | null
    username?: string
  }
  error: string | null | undefined
}

const initialState: UserStateTypes = {
  loading: false,
  userData: {
    name: '',
    email: '',
    userImage: '',
    uid: '',
    timeStamp: null,
    username: ''
  },
  error: ''
}

interface UserSginInput {
  email: string
  password: string
}

// CAT는 첫전째 인수로 slice이름, 두번째 인수로 callback 함수를 받는다.
export const signInGoogleHandler = createAsyncThunk('user/signinGoogleHandler', async () => {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(authService, provider)
    const user = authService.currentUser?.providerData[0]
    console.log('currentUser.providerData[0]: ', user)
    return user
  } catch (error) {
    console.log(error)
  }
})

export const signInFacebookHandler = createAsyncThunk('user/signinFacebookHandler', async () => {
  try {
    const provider = new FacebookAuthProvider()
    await signInWithPopup(authService, provider)
    const user = authService.currentUser?.providerData[0]
    console.log('currentUser.providerData[0]: ', user)
    return user
  } catch (error) {
    console.log(error)
  }
})

export const signUpEmail = createAsyncThunk(
  'user/signUpEmail',
  async ({ email, password }: UserSginInput) => {
    try {
      const data = await createUserWithEmailAndPassword(authService, email, password)
      console.log(data)
      const user = authService.currentUser?.providerData[0]
      console.log('currentUser.providerData[0]: ', user)
      return user
    } catch (error) {
      console.log(error)
    }
  }
)

export const signInEmail = createAsyncThunk(
  'user/signInEmail',
  async ({ email, password }: UserSginInput) => {
    try {
      await signInWithEmailAndPassword(authService, email, password)
      const user = authService.currentUser?.providerData[0]
      console.log('currentUser.providerData[0]: ', user)
      return user
    } catch (error: any) {
      alert(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInGoogleHandler.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.userData.email = payload.email
      state.userData.name = payload.displayName
      state.userData.userImage = payload.photoURL
      state.userData.uid = payload.uid
      state.userData.timeStamp = payload.metadata.creationTime
      state.userData.username = payload.displayName
    })
    builder.addCase(signInFacebookHandler.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.userData.email = payload.email
      state.userData.name = payload.displayName
      state.userData.userImage = payload.photoURL
      state.userData.uid = payload.uid
      state.userData.timeStamp = payload.metadata.creationTime
      state.userData.username = payload.displayName
    })
    builder.addCase(signUpEmail.fulfilled, (state, { payload }: any) => {})
    builder.addCase(signInEmail.fulfilled, (state, { payload }: any) => {
      state.loading = false
      state.error = null
      state.userData.email = payload.email
      state.userData.name = payload.displayName
      state.userData.userImage = payload.photoURL
      state.userData.uid = payload.uid
      state.userData.timeStamp = null
      state.userData.username = payload.displayName
    })
    builder.addCase(signInEmail.rejected, (state, { payload }: any) => {
      state.loading = false
      state.error = payload.message
    })
  }
})

export const userReducer = userSlice.reducer
