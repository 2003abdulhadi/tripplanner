import { login, signup } from "./actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex-auto flex items-center justify-center">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardContent>
              <form action={login} className="flex flex-col gap-2">
                <Label htmlFor="email">Email: </Label>
                <Input id="email" type="email" name="email" required />
                <Label htmlFor="password">Password: </Label>
                <Input id="password" type="password" name="password" required />
                <Button>Log In</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardContent>
              <form action={signup} className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name: </Label>
                <Input id="firstName" type="text" name="firstName" required />
                <Label htmlFor="lastName">Last Name: </Label>
                <Input id="lastName" type="text" name="lastName" required />
                <Label htmlFor="email">Email: </Label>
                <Input id="email" type="email" name="email" required />
                <Label htmlFor="password">Password: </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  minLength={8}
                />
                <Button>Sign Up</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
