<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FallbackController
{


/*
   #[Route('/{route}', name: 'fallback', requirements: ['route' => '^(?!api/).*'])]
    public function index(): Response
    {
        $filePath = '../public/index.html';

        if (!file_exists($filePath)) {
            return new Response('File not found', Response::HTTP_NOT_FOUND);
        }

        return new Response(file_get_contents($filePath), Response::HTTP_OK, [
            //'Content-Type' => 'text/html',
        ]);
    }
*/

    #[Route('/assets/{path}', name: 'serve_assets', requirements: ['path' => '.+'])]
    public function serveAsset(string $path, Request $request): Response
    {
        $filePath = __DIR__ . '/../../public/assets/' . $path;

        if (!file_exists($filePath)) {
            throw $this->createNotFoundException('File not found: ' . $path);
        }

        // Déduire le type de contenu en fonction de l'extension du fichier
        $extension = pathinfo($filePath, PATHINFO_EXTENSION);
        $mimeTypes = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'svg' => 'image/svg+xml',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            'eot' => 'application/vnd.ms-fontobject',
        ];
        $contentType = $mimeTypes[$extension] ?? 'application/octet-stream';

        // Créer une réponse avec le contenu du fichier
        return new Response(file_get_contents($filePath), 200, ['Content-Type' => $contentType]);

    }



    }