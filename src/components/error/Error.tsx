import React, { FC } from 'react'
import global from '../../css/Global.module.css'

interface IErrorProps {
  errorMessage: string
}

export const Error: FC<IErrorProps> = ({ errorMessage }) => {
  return (
    <div className={global.alert}>
      <span>
        {errorMessage}
        <br />
        Please refresh the page.
      </span>
    </div>
  )
}
