import { Routes, Route, useLocation } from "react-router-dom";

import {
  Home,
  Calculator,
  Market,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import { MessageBot } from "./components/shared";
import { useEffect } from "react";
import CoinHistory from "./_root/pages/Market/CoinHistory";

const App = () => {
  const route = useLocation();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <main className="flex h-full w-full">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/market" element={<Market />} />
          <Route path="/market/:name" element={<CoinHistory />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route
            path="/update-profile/:id"
            element={<UpdateProfile profile_image={""} />}
          />
        </Route>
      </Routes>

      <div className={`${location.pathname === "/" ? "" : "hidden"}`}>
        <MessageBot />
      </div>

      <Toaster />
    </main>
  );
};

export default App;
