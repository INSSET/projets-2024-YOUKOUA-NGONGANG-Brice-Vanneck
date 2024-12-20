<?php

namespace App\Controller;

use App\Entity\Intervention;
use App\Entity\Ruche;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;


#[Route('api/intervention/')]
class InterventionController extends AbstractController
{

    private $interventionRepository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->interventionRepository = $entityManager->getRepository(Intervention::class);

    }

    #[Route('save', name: 'ruche_save', methods: ['POST'])]
    public function save(Request $request,EntityManagerInterface $entityManager)
    {

        $intervention = new Intervention();
        $data=json_decode($request->getContent(),true);

        $rucheRepository =  $entityManager->getRepository(Ruche::class);
        $ruche = $rucheRepository->find($data['ruche_id']);

        $intervention->setLibelle($data['libelle']);
        $intervention->setRuche($ruche);

        //$ruche->setUser($this->user);
        $entityManager->persist($intervention);
        $entityManager->flush();
        return $this->json($intervention,201);
    }



}