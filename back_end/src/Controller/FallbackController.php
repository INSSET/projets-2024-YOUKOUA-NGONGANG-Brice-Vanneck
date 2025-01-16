<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FallbackController
{



//    #[Route('/{route}', name: 'fallback', requirements: ['route' => '^(?!api/).*'])]
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

}