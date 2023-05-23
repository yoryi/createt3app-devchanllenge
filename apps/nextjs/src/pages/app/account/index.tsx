import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { NextPage } from "next";
import Image from "next/image";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { toast } from "react-hot-toast";

import { api } from "~/utils/api";
import { Layout } from "~/components/layout/layout";
import store from "~/store";

const AccountPage: NextPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { name, setName } = store((state) => state);

  const { mutateAsync: updateUser, isLoading } = api.users.update.useMutation();

  async function convertBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleFileChange = useCallback(
    async (event: SyntheticEvent<HTMLInputElement>) => {
      const currentfile = event.currentTarget.files?.[0];
      if (currentfile) {
        const base64String = await convertBase64(currentfile!);
        setProfileImage(base64String);
      }
    },
    [],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateUser({
      email,
      firstName,
      lastName,
      password,
      image: profileImage,
    });
    toast.success("Profile was saved in database successfully.");
  };
  return (
    <div className="h-screen">
      <Layout>
        <div className="text-center mt-6">
          <form onSubmit={handleSubmit} className="flex justify-center">
            <div className="w-[30%] mt-[20px]">
              <Image
                alt="profile"
                src={profileImage !== "" ? profileImage : "/assets/user.png"}
                width={60}
                height={60}
                className="m-auto cursor-pointer border border-[1px] rounded-full"
                onClick={() => {
                  inputRef.current?.click();
                }}
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                Personal Information
              </h3>
              <input
                type="file"
                hidden
                ref={inputRef}
                onChange={async (e) => {
                  await handleFileChange(e);
                }}
              />
              <Stack
                spacing={2}
                direction="row"
                sx={{ marginBottom: 4, marginTop: 4 }}
              >
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  fullWidth
                  required
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  fullWidth
                  required
                />
              </Stack>
              <TextField
                type="email"
                variant="outlined"
                color="secondary"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
              <TextField
                type="password"
                variant="outlined"
                color="secondary"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                fullWidth
                sx={{ mb: 4 }}
              />
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                disabled={isLoading}
                className="flex gap-5 w-full"
              >
                {isLoading && <CircularProgress size={20} />}
                Register
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default AccountPage;
