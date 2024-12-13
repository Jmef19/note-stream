import LateralMenu from "@/components/LateralMenu";

export default function Home() {
  return (
    <div className="flex">
      <LateralMenu />
      <div className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome to NoteStream</h1>
        {/* Add your main content here */}
      </div>
    </div>
  );
}
