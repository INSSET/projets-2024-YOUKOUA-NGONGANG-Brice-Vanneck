<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Symfony\Component\HttpFoundation\JsonResponse;

class JWTFailureHandler
{
    public function onAuthenticationFailure(AuthenticationFailureEvent $event)
    {
        $response = new JsonResponse([
            'status' => 'error',
            'message' => 'Identifiants invalides, vérifiez vos informations.',
        ], JsonResponse::HTTP_UNAUTHORIZED);

        $event->setResponse($response);
    }

    public function onJWTNotFound(JWTNotFoundEvent $event)
    {
        $response = new JsonResponse([
            'status' => 'error',
            'message' => 'Aucun token trouvé, veuillez vous connecter.',
        ], JsonResponse::HTTP_FORBIDDEN);

        $event->setResponse($response);
    }

    public function onJWTExpired(JWTExpiredEvent $event)
    {
        $response = new JsonResponse([
            'status' => 'error',
            'message' => 'Votre session a expiré. Veuillez renouveler votre connexion.',
        ], JsonResponse::HTTP_UNAUTHORIZED);

        $event->setResponse($response);
    }
}
