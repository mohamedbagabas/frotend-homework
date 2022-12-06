import * as React from "react"
import {
  ChakraProvider, Box, theme, Flex, VStack, Heading,Text,Input,Button
} from "@chakra-ui/react"
import LoginPage from "./components/login/LoginForm"
import { RegisterPage } from "./Pages/Register.Page"
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogsPage from "./Pages/BlogPage";

export const App = () => {

 return (
  <BrowserRouter>
  <ChakraProvider theme={theme}>
    <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path='/' element={<BlogsPage />} />
    </Routes>
  </ChakraProvider>
  </BrowserRouter>
)
  }
