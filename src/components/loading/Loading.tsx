import React, { FC } from 'react'
import global from '../../css/Global.module.css'

export const Loading: FC = () => {
  return (
    <div className={global.alert}><span>Loading ...</span></div>
  )
}
