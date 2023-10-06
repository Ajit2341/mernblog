import React, { Component } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {

    return (
        <main>
            <Header />
            <Outlet></Outlet>
        </main>
    )

}

export default Layout;