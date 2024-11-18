import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/formatDate";
import { routes } from "@/lib/routes";
import { Link } from "react-router-dom";

export const Home = () => {
  const { user } = useAuth();

  const date = new Date(user.createdAt);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl">About me</h1>
      <ul className="flex flex-col gap-2">
        <li className="space-x-1">
          <b>Email:</b>
          <span>{user.email}</span>
        </li>
        <li className="space-x-1">
          <b>Date sign up:</b>
          <span>{formatDate(date)}</span>
        </li>
      </ul>
      <Link to={routes.notes.root}>
        <Button>Go to Notes</Button>
      </Link>
    </div>
  );
};
