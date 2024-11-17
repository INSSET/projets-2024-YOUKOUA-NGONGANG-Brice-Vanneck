<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{

    public function __construct(private Security $security)
    {
    }

    #[Route('/home', name: 'app_home')]
    public function index(): Response
    {
        return $this->json("Bienvenu  !!");
    }

    #[Route('api/me', name: 'app_home')]
    public function me(): Response
    {
        $user = $this->security->getUser();
        //dd($user);
        return $this->json($user);
    }

    #[Route('api/other', name: 'app_other')]
    public function another(): Response
    {
        $user = $this->security->getUser();
        //dd($user);
        return $this->json($user);
    }


}
