import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyPasswordResetToken } from "@/lib/actions/user.actions";

export default async function ResetPasswordPage({ params }: { params: { token: string } }) {
  const { token } = params;
  const isValidToken = await verifyPasswordResetToken(token);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      {isValidToken ? (
        <ResetPasswordForm token={token} />
      ) : (
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Invalid Token</CardTitle>
            <CardDescription>The password reset link is invalid or has expired. Please request a new one.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
