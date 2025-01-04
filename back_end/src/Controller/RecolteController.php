<?php

namespace App\Controller;

use App\Entity\Intervention;
use App\Entity\Recolte;
use App\Entity\Ruche;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/recolte/')]
class RecolteController extends AbstractController
{


    #[Route('all/{rucheid}', name: 'recolte_get_all', methods: ['GET'])]
    public function getAll(EntityManagerInterface $entityManager,$rucheid)
    {
        $recolteRepository =  $entityManager->getRepository(Recolte::class);
        $recolte = $recolteRepository->findGroupedByDate($rucheid);
        return $this->json($recolte);
    }

    #[Route('save', name: 'recolte_save', methods: ['POST'])]
    public function save(Request $request,EntityManagerInterface $entityManager)
    {

        $recolte = new Recolte();
        $data=json_decode($request->getContent(),true);

        $rucheRepository =  $entityManager->getRepository(Ruche::class);
        $ruche = $rucheRepository->find($data['ruche_id']);

        $recolte->setPoids($data['poids']);
        $recolte->setRuche($ruche);
        $date = \DateTime::createFromFormat('d/m/Y', $data['date']);

        $recolte->setDate($date);

        $entityManager->persist($recolte);
        $entityManager->flush();
        return $this->json($recolte,201);
    }


}