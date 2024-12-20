<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Symfony\Component\HttpFoundation\JsonResponse;

class JWTExceptionListener
{
    public function onAuthenticationFailure(AuthenticationFailureEvent $event)
    {
        $response = new JsonResponse([
            'message' => 'Authentification échouée : identifiants invalides.',
        ], JsonResponse::HTTP_UNAUTHORIZED);

        $event->setResponse($response);
    }

    public function onJWTNotFound(JWTNotFoundEvent $event)
    {
        $response = new JsonResponse([
            'message' => 'Token introuvable. Veuillez vous connecter.',
        ], JsonResponse::HTTP_FORBIDDEN);

        $event->setResponse($response);
    }

    public function onJWTExpired(JWTExpiredEvent $event)
    {
        $response = new JsonResponse([
            'message' => 'Votre session a expiré. Veuillez vous reconnecter.',
        ], JsonResponse::HTTP_UNAUTHORIZED);

        $event->setResponse($response);
    }
}
