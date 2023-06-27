"use client";

import { getProviders, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  
  const [providers, setProvider] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      console.log("Authprovider", res);
      setProvider(res);
    };

    fetchProviders()
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.id}>
              <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}                
              </button>
            </div>
          );
        })}
      </div>
    );
  }
};

export default AuthProviders;
