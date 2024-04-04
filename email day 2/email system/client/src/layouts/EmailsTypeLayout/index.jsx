
import { Outlet } from 'react-router-dom'
import EmailTypeNav from '../../components/emailType/emailTypeNav'



const EmailsTypeLayout = () => {
  return (
    <>
      <EmailTypeNav />
      <Outlet />
    </>
  )
}

export default EmailsTypeLayout
