import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    return <div className="absolute top-1/2 left-1/2 scale-125 -translate-x-1/2 -translate-y-1/2"><Spinner /></div>
}