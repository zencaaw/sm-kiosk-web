import { LoaderCircle } from "lucide-react";

export default function Loader({ isLoading }: { isLoading: boolean }) {
  return (
    <LoaderCircle width={100} height={100} className={`fixed top-1/2 left-1/2 -translate-1/2 self-center animate-spin ${isLoading ? "" : "hidden"}`} />
  )
}
