"use client"

import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IntensityPicker, } from "@/components/IntensityPicker"
import { SET_INTENSITY } from "@/store/reducers/schedule.reducer"
import { IntensityValue, RootState } from "@/types/user.types"



export function ScheduleIntensity() {
  const dispatch = useDispatch()
  const initialized = useRef(false)

  const intensity = useSelector((state: RootState) => {
    return state.scheduleModule.multiStepForm.preferences.intensity ?? null
  })

  const userPreferences = useSelector((state: RootState) => {
    return state.userModule?.user?.preferences ?? null
  })

  const intensityOptions: IntensityValue[] = useMemo(
    () => ["relaxed", "moderate", "intense"],
    []
  )

  useEffect(() => {
    if (!initialized.current && userPreferences?.intensity && !intensity) {
      initialized.current = true
      if (intensityOptions.includes(userPreferences.intensity)) {
        dispatch({ type: SET_INTENSITY, intensity: userPreferences.intensity })
      }
    }
  }, [dispatch, intensity, intensityOptions, userPreferences])

  const handleChange = (next: IntensityValue) => {
    dispatch({ type: SET_INTENSITY, intensity: next })
  }

  return (
    <IntensityPicker value={intensity} onChange={handleChange} />
  )
}

export default ScheduleIntensity
