"use client";

import { useEffect, useState } from "react";
import { Code, Link, Surface, Table, Tabs, Text, cn } from "@cloudflare/kumo";

const LS_KEY = "malvinas-embed-tab";

export interface BannerVariant {
  id: string;
  w: number;
  h: number;
  publicName: string;
  forWho: string;
}

export interface MalvinasHomeProps {
  base: string;
  ogImage: string;
  variants: readonly BannerVariant[];
}

type EmbedFormat = "markdown" | "html" | "url";

const tabDefs = [
  { value: "markdown", label: "Markdown" },
  { value: "html", label: "HTML" },
  { value: "url", label: "URL" },
] as const;

const page = "mx-auto w-full max-w-3xl px-4 md:px-6";
const stack = "flex flex-col gap-4";
const sectionGap = "flex flex-col gap-10 md:gap-12";

export default function MalvinasHome({ base, ogImage, variants }: MalvinasHomeProps) {
  const [format, setFormat] = useState<EmbedFormat>("markdown");

  useEffect(() => {
    try {
      const s = localStorage.getItem(LS_KEY);
      if (s === "html" || s === "markdown" || s === "url") setFormat(s);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, format);
    } catch {
      /* ignore */
    }
  }, [format]);

  const onTabChange = (v: string) => {
    if (v === "html" || v === "markdown" || v === "url") setFormat(v);
  };

  return (
    <div className="min-h-screen bg-kumo-surface text-kumo-default">
      <Surface
        as="header"
        className={cn(
          "border-b border-kumo-fill bg-gradient-to-br from-[#75AADB] via-[#DCECFA] to-[#FFF9ED]",
        )}
      >
        <div className={cn(page, "py-10 md:py-12", stack)}>
          <Text variant="secondary" size="sm" bold>
            malvinas.argentinadatos.com
          </Text>
          <Text as="h1" variant="heading1">
            Banners sobre las Islas Malvinas
          </Text>
          <Text as="p" variant="body" size="lg">
            Acá tenés imágenes listas para mostrar, con claridad y respeto, que las Islas Malvinas son{" "}
            <Text bold as="span">
              argentinas
            </Text>
            . Podés usarlas en redes, en tu sitio o en materiales digitales sin tener que diseñarlas desde
            cero.
          </Text>
        </div>
      </Surface>

      <main id="contenido" className={cn(page, "py-10 md:py-12", sectionGap)}>
        <section className={stack} aria-labelledby="que-es">
          <Text as="h2" variant="heading2" id="que-es">
            ¿Qué es esto?
          </Text>
          <Text as="p" variant="body">
            Es un conjunto de{" "}
            <Text bold as="span">
              banners en PNG y JPG
            </Text>{" "}
            (varios tamaños) que incluyen un mapa de las islas y textos sobre{" "}
            <Text bold as="span">
              soberanía nacional
            </Text>
            . Están pensados para que cualquier persona u organización pueda reutilizarlos de forma
            simple, copiando la dirección de la imagen o descargándola.
          </Text>
        </section>

        <section className={stack} aria-labelledby="contexto">
          <Text as="h2" variant="heading2" id="contexto">
            Contexto, en pocas palabras
          </Text>
          <Text as="p" variant="body">
            Las{" "}
            <Text bold as="span">
              Islas Malvinas
            </Text>{" "}
            son un archipiélago del Atlántico Sur. La Argentina sostiene que forman parte de su
            territorio y que fueron ocupadas por el Reino Unido en el siglo XIX; la disputa es conocida
            internacionalmente y hay un proceso diplomático en curso. Estas imágenes reflejan la{" "}
            <Text bold as="span">
              posición argentina
            </Text>{" "}
            y el reclamo de soberanía de manera pacífica y visible en internet.
          </Text>
        </section>

        <section className={stack} aria-labelledby="descargar">
          <Text as="h2" variant="heading2" id="descargar">
            Cómo usarlas
          </Text>
          <Text as="p" variant="body">
            <Text bold as="span">
              Enlace directo:
            </Text>{" "}
            copiá la URL del archivo (por ejemplo para incrustarla en un foro o en HTML).
          </Text>
          <Text as="p" variant="body">
            <Text bold as="span">
              Descarga:
            </Text>{" "}
            abrí la imagen en el navegador y usá “Guardar imagen como…” (o el equivalente en tu
            dispositivo).
          </Text>
          <Text as="p" variant="body">
            Cada variante existe en <Text bold as="span">PNG</Text> (mejor calidad) y{" "}
            <Text bold as="span">JPG</Text> (archivo más liviano); elegí según te pida la red o el
            programa.
          </Text>
        </section>

        <section className={stack} aria-labelledby="tabla-title">
          <Text as="h2" variant="heading2" id="tabla-title">
            Tipos de banner
          </Text>
          <Text as="p" variant="body">
            Cada nombre (<Text variant="mono">strip</Text>, <Text variant="mono">og</Text>, etc.) es el
            que aparece en la dirección web del archivo.
          </Text>
          <div className="overflow-x-auto rounded-xl border border-kumo-fill">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Nombre</Table.Head>
                  <Table.Head>Tamaño</Table.Head>
                  <Table.Head>Para qué sirve</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {variants.map((v) => (
                  <Table.Row key={v.id}>
                    <Table.Cell>
                      <Text variant="body" bold>
                        {v.publicName}
                      </Text>
                      <Text variant="mono-secondary" as="span">
                        {" "}
                        ({v.id})
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      {v.w}×{v.h}
                    </Table.Cell>
                    <Table.Cell>{v.forWho}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </section>

        <section className={cn(sectionGap)} aria-labelledby="preview-title">
          <div className={stack}>
            <Text as="h2" variant="heading2" id="preview-title">
              Cómo se ven
            </Text>
            <Text as="p" variant="body">
              Vista previa de cada variante y, debajo, la{" "}
              <Text bold as="span">
                URL pública
              </Text>{" "}
              en Markdown, HTML o solo el enlace directo (pestaña{" "}
              <Text variant="mono">URL</Text>). Las tres pestañas se sincronizan entre todas las tarjetas.
              Para JPEG, reemplazá <Text variant="mono">.png</Text> por <Text variant="mono">.jpg</Text>{" "}
              en la dirección.
            </Text>
          </div>

          <div className="flex flex-col gap-8">
            {variants.map((v) => {
              const fileUrl = new URL(`${v.id}.png`, base).href;
              const mdSnippet = `![${v.publicName} — Malvinas Argentinas](${fileUrl})`;
              const htmlSnippet = `<img src="${fileUrl}" width="${v.w}" height="${v.h}" alt="Islas Malvinas Argentinas — ${v.publicName}" />`;
              return (
                <Surface
                  key={v.id}
                  as="figure"
                  className={cn(
                    "flex flex-col gap-4 overflow-hidden rounded-xl border border-kumo-fill p-4 shadow-sm",
                  )}
                >
                  <Text as="figcaption" variant="body" bold>
                    {v.publicName} · {v.w}×{v.h}px
                  </Text>
                  <div className="overflow-hidden rounded-lg bg-kumo-recessed leading-none">
                    <img
                      src={`/${v.id}.png`}
                      alt={`Banner ${v.publicName}: mapa de las Islas Malvinas y texto sobre soberanía argentina.`}
                      width={v.w}
                      height={v.h}
                      className="block h-auto w-full max-w-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex w-full min-w-0 flex-col gap-3">
                    <Tabs
                      variant="underline"
                      className="w-full shrink-0"
                      tabs={[...tabDefs]}
                      value={format}
                      onValueChange={onTabChange}
                    />
                    {format === "markdown" ? (
                      <Code code={mdSnippet} lang="bash" className={cn("overflow-x-auto select-all")} />
                    ) : format === "html" ? (
                      <Code code={htmlSnippet} lang="tsx" className={cn("overflow-x-auto select-all")} />
                    ) : (
                      <Code code={fileUrl} lang="bash" className={cn("overflow-x-auto select-all")} />
                    )}
                  </div>
                </Surface>
              );
            })}
          </div>
        </section>
      </main>

      <Surface as="footer" className="border-t border-kumo-fill">
        <div className={cn(page, "py-8 text-center space-y-1")}>
          <Text as="p" variant="body" size="sm">
            Las Islas Malvinas son <Text bold as="span">argentinas</Text>.
          </Text>

          <Text as="p" variant="body" size="sm">
            Un proyecto de <a href="https://argentinadatos.com" className="underline">ArgentinaDatos</a>
            .{" "}
          </Text>

          <Text as="p" variant="body" size="sm">
            <Link
              href="https://github.com/enzonotario/malvinas.argentinadatos.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Código en GitHub
            </Link>
            .
          </Text>
        </div>
      </Surface>
    </div>
  );
}
