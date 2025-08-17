import React, { useEffect } from 'react'
import Layout from '../layout/Layout'

import ProfileDashboard from '../profiledashboard/ProfileDashboard'
import { useSelector } from 'react-redux'

const WalletHistoryPage = () => {
    const language = useSelector(state => state.Language.selectedLanguage)

    useEffect(() => { }, [language])
    return (
        <Layout>
            <ProfileDashboard />
        </Layout>
    )
}

export default WalletHistoryPage