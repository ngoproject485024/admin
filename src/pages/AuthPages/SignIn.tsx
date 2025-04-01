import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="میراث ناملموس | ورود"
        description="صفحه ورود به پنل ادمین"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
