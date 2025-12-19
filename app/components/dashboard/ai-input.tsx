import { useEffect, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowUpIcon, Cross, Loader2, Plus, X } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useFetcher } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
export default function AIInput() {
  const [msgLock, setMsgLock] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [styles, setStyles] = useState<("Concise" | "Detailed" | "Bullet")[]>(
    []
  );
  const { state } = useSidebar();
  let fetcher = useFetcher();

  useEffect(() => {
    if (prompt.length > 0) {
      setMsgLock(false);
    } else {
      setMsgLock(true);
    }
  }, [prompt]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    // Ensure the file is a PDF
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      toast.error("Only PDF files are allowed. Please select a PDF.", {
        classNames: {
          icon: "text-red-4s00",
          content: "text-red-700 dark:text-red-400",
          description: "text-red-600 dark:text-red-400",
          default: "bg-red-50 dark:bg-red-900/30",
        },
        richColors: true,
        position: "top-center",
        className:
          "bg-neutral-300 dark:bg-neutral-800! border border-red-300! shadow-lg!",
      });
      e.currentTarget.value = "";
      return;
    }

    setSelectedFile(file);
  }

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const generateNotes = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  // Calculate positioning based on sidebar state
  const sidebarOffset =
    state === "expanded" ? "sm:left-[calc(50%+8rem)]" : "left-1/2";

  return (
    <fetcher.Form method="post" action="/api/ai" encType="multipart/form-data">
      <InputGroup
        className={`fixed bottom-0 rounded-b-none sm:rounded-md ${sidebarOffset} -translate-x-1/2 z-10 sm:bottom-5 w-full sm:w-100 md:w-140 px-5 sm:px-0 dark:bg-neutral-900 bg-white border-t sm:border sm:dark:border-neutral-700 border-gray-300 dark:border-neutral-700 transition-all duration-300`}
      >
        {/* Multi line input box */}
        <InputGroupTextarea
          className="my-0 min-h-0 resize-none"
          maxLength={500}
          rows={1}
          value={prompt}
          name="prompt"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Create notes for the ...."
        />

        {/* Hidden file input used to open file dialog and accept only PDFs */}
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          accept="application/pdf,.pdf"
          className="hidden"
          aria-hidden="true"
          onChange={handleFileChange}
        />
        <input type="hidden" name="styles" value={styles.join(",")} />
        <InputGroupAddon align="block-end">
          {selectedFile && (
            <InputGroupText>
              <Badge className="text-xs pl-1 pr-2 py-0.5 bg-transparent border border-neutral-600 max-w-40 sm:max-w-50 text-neutral-700 dark:text-neutral-400 cursor-default select-none flex items-center gap-1">
                <Button
                  variant={"secondary"}
                  size={"icon-sm"}
                  className="h-4.5 w-4.5 bg-transparent shrink-0"
                  onClick={removeSelectedFile}
                >
                  <X className="h-1 w-1 text-red-400" />
                </Button>
                <span className="truncate">{selectedFile.name}</span>
              </Badge>
            </InputGroupText>
          )}
          <InputGroupButton
            variant="outline"
            className="rounded-full"
            size="icon-xs"
            disabled={selectedFile !== null}
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus />
          </InputGroupButton>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="ml-auto">
              <InputGroupButton 
                className="text-xs sm:text-sm w-16 sm:w-20 text-center"
              variant="ghost">
                {styles.length === 0 ? "Select Styles" : ""}
                {styles.length === 1 ? styles[0] : ""}
                {styles.length >= 2 ? `${styles.length} selected` : ""}
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="dark:bg-neutral-900 border dark:border-neutral-600 bg-white border-gray-200 dark:shadow-lg rounded-lg transition-all duration"
            >
              <DropdownMenuCheckboxItem
                className="dark:focus:bg-neutral-800 transition-all duration-200"
                textValue="Concise"
                checked={styles.includes("Concise")}
                onCheckedChange={(checked) => {
                  setStyles((prevStyles) =>
                    checked
                      ? [...prevStyles, "Concise"]
                      : prevStyles.filter((s) => s !== "Concise")
                  );
                }}
              >
                Concise
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="dark:focus:bg-neutral-800 transition-all duration-200"
                textValue="Detailed"
                checked={styles.includes("Detailed")}
                onCheckedChange={(checked) => {
                  setStyles((prevStyles) =>
                    checked
                      ? [...prevStyles, "Detailed"]
                      : prevStyles.filter((s) => s !== "Detailed")
                  );
                }}
              >
                Detailed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="dark:focus:bg-neutral-800 transition-all duration-200"
                textValue="Bullet"
                checked={styles.includes("Bullet")}
                onCheckedChange={(checked) => {
                  setStyles((prevStyles) =>
                    checked
                      ? [...prevStyles, "Bullet"]
                      : prevStyles.filter((s) => s !== "Bullet")
                  );
                }}
              >
                Bullet Points
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="h-5! bg-neutral-500" />

          <InputGroupButton
            type="submit"
            variant="default"
            className={`rounded-full ${msgLock ? "bg-muted" : ""} ${loading ? "bg-white opacity-90" : ""}`}
            size="icon-xs"
            disabled={
              msgLock ||
              fetcher.state === "submitting" ||
              fetcher.state === "loading"
            }
          >
            {fetcher.state === "idle" && (
              <ArrowUpIcon
                className={msgLock ? "text-gray-400" : "text-gray-900"}
              />
            )}

            {(fetcher.state === "submitting" ||
              fetcher.state === "loading") && (
              <Loader2 className="animate-spin" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </fetcher.Form>
  );
}
