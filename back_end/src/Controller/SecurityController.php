<?php

namespace App\Controller;

use App\Entity\Ruche;
use App\Entity\User;
use App\Form\UserFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

//#[Route('api/')]
class SecurityController extends AbstractController
{


    private $userRepository;
    private $user;
    public function __construct(EntityManagerInterface $entityManager,Security $security)
    {

    }


    #[Route('api/login', name: 'auth_login', methods: ['POST'])]
    public function login(Request $request): Response
    {
        return $this->json('Security' ,201);
    }


    #[Route('api/register', name: 'auth_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher,EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = $this->createForm(UserFormType::class, $user);
        //$form->handleRequest($request);
        $data=json_decode($request->getContent(),true);
        //return $this->json($data);
        $form->submit($data);


        if ($user->getPassword()!=null  && $user->getEmail()!=null) {
            // encode the plain password
            //return $this->json($user);
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('password')->getData()
                )
            );

            $entityManager->persist($user);
            $entityManager->flush();
            // do anything else you need here, like send an email
            return $this->json([
                "message"=>"Inscription réussi!"
            ]);
        }
        return $this->json("No register");
    }


    #[Route('api/get_user', name: 'getUser')]
    public function getUSerInfo(EntityManagerInterface $entityManager,Security $security)
    {
        //dd($user);
        $this->userRepository = $entityManager->getRepository(User::class);

        $user = $security->getUser()->getUserIdentifier();

        $this->user = $this->userRepository->findOneBy([
            'email' => $user
        ]);

        return $this->json($this->user);
    }



}
