import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, RotateCw, FlipHorizontal, FlipVertical, Crop as CropIcon } from "lucide-react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import FileDropZone from "@/components/tools/FileDropZone";
import { Button } from "@/components/ui/button";
import { cropImage, flipImage, rotateImage } from "@/lib/tools/cropRotateImage";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MIN_SELECTION_PX = 8;

const RecortarImagenPage = () => {
  const { t } = useTranslation("tools");

  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selection, setSelection] = useState<Rect | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const applyBlob = (newBlob: Blob) => {
    setUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(newBlob);
    });
    setBlob(newBlob);
    setSelection(null);
  };

  const handleFile = (selected: File) => {
    setFile(selected);
    setError(null);
    applyBlob(selected);
  };

  const reset = () => {
    if (url) URL.revokeObjectURL(url);
    setFile(null);
    setBlob(null);
    setUrl(null);
    setSelection(null);
    setError(null);
  };

  const runOp = async (op: () => Promise<Blob>) => {
    if (!blob) return;
    setProcessing(true);
    setError(null);
    try {
      applyBlob(await op());
    } catch {
      setError(t("ui.error_generic"));
    } finally {
      setProcessing(false);
    }
  };

  const handleCrop = () => {
    if (!blob || !selection || !imgRef.current) return;
    const img = imgRef.current;
    const scaleX = img.naturalWidth / img.clientWidth;
    const scaleY = img.naturalHeight / img.clientHeight;
    runOp(() =>
      cropImage(blob, {
        x: selection.x * scaleX,
        y: selection.y * scaleY,
        width: selection.width * scaleX,
        height: selection.height * scaleY,
      })
    );
  };

  const clampToImage = (value: number, max: number) => Math.min(Math.max(value, 0), max);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = clampToImage(e.clientX - rect.left, rect.width);
    const y = clampToImage(e.clientY - rect.top, rect.height);
    dragStart.current = { x, y };
    setSelection({ x, y, width: 0, height: 0 });
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragStart.current || !imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const x = clampToImage(e.clientX - rect.left, rect.width);
      const y = clampToImage(e.clientY - rect.top, rect.height);
      const start = dragStart.current;
      setSelection({
        x: Math.min(start.x, x),
        y: Math.min(start.y, y),
        width: Math.abs(x - start.x),
        height: Math.abs(y - start.y),
      });
    };
    const handleUp = () => {
      dragStart.current = null;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <ToolPageLayout toolId="recortar-imagen">
      <div className="border border-neutral-800 rounded-xl p-6 md:p-8">
        {!file || !url ? (
          <FileDropZone
            accept="image/jpeg,image/png,image/webp"
            label={t("ui.upload_label")}
            hint={t("ui.upload_hint")}
            onFile={handleFile}
            toolId="recortar-imagen"
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400 truncate max-w-[60%]">{file.name}</span>
              <Button
                variant="outline"
                onClick={reset}
                className="rounded-full px-6 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                {t("ui.reset_button")}
              </Button>
            </div>

            <p className="text-neutral-500 text-xs">{t("ui.crop_drag_hint")}</p>

            <div
              className="relative inline-block select-none max-w-full"
              onMouseDown={handleMouseDown}
            >
              <img ref={imgRef} src={url} alt={file.name} className="max-w-full max-h-[28rem] block" draggable={false} />
              {selection && selection.width > 2 && selection.height > 2 && (
                <div
                  className="absolute border-2 border-orange-500 bg-orange-500/10 pointer-events-none"
                  style={{
                    left: selection.x,
                    top: selection.y,
                    width: selection.width,
                    height: selection.height,
                  }}
                />
              )}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => runOp(() => rotateImage(blob!, 90))}
                disabled={processing}
                variant="outline"
                className="rounded-full px-5 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                <RotateCw className="w-4 h-4" />
                {t("ui.rotate_button")}
              </Button>
              <Button
                onClick={() => runOp(() => flipImage(blob!, "horizontal"))}
                disabled={processing}
                variant="outline"
                className="rounded-full px-5 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                <FlipHorizontal className="w-4 h-4" />
                {t("ui.flip_horizontal_button")}
              </Button>
              <Button
                onClick={() => runOp(() => flipImage(blob!, "vertical"))}
                disabled={processing}
                variant="outline"
                className="rounded-full px-5 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                <FlipVertical className="w-4 h-4" />
                {t("ui.flip_vertical_button")}
              </Button>
              <Button
                onClick={handleCrop}
                disabled={
                  processing || !selection || selection.width < MIN_SELECTION_PX || selection.height < MIN_SELECTION_PX
                }
                variant="outline"
                className="rounded-full px-5 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                <CropIcon className="w-4 h-4" />
                {t("ui.crop_button")}
              </Button>
              <a href={url} download={`recortada-${file.name}`} className="ml-auto">
                <Button className="bg-white text-black hover:bg-white/80 rounded-full px-8">
                  <Download className="w-4 h-4" />
                  {t("ui.download_button")}
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default RecortarImagenPage;
