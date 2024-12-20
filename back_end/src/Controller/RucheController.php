<?php

namespace App\Controller;
use App\Entity\Ruche;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

#[Route('api/ruche/')]
class RucheController extends AbstractController
{

    private $rucheRepository;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->rucheRepository = $entityManager->getRepository(Ruche::class);
    }

    #[Route('all', name: 'ruche_get_all', methods: ['GET'])]
    public function getAll()
    {
        $ruches = $this->rucheRepository->findAll();
        return $this->json($ruches);
    }

    #[Route('get/{id}', name: 'ruche_getBy_id', methods: ['GET'])]
    public function getById($id)
    {
        $ruche = $this->rucheRepository->find($id);
        return $this->json($ruche);
    }

    #[Route('save', name: 'ruche_save', methods: ['POST'])]
    public function save(Request $request,EntityManagerInterface $entityManager)
    {

        $ruche = new Ruche();
        $ruche->setLibelle($request->request->get('libelle'));
        $ruche->setLatitude($request->request->get('latitude'));
        $ruche->setLongitude($request->request->get('longitude'));

        $entityManager->persist($ruche);
        $entityManager->flush();
        return $this->json($ruche,201);
    }


    #[Route('delete/{id}', name: 'ruche_delete', methods:['delete'] )]
    public function delete(EntityManagerInterface $entityManager, int $id)
    {
        $ruche = $this->rucheRepository->find($id);
        if (!$ruche) {
            return $this->json('Ruche non trouvé' . $id, 404);
        }
        $entityManager->remove($ruche);
        $entityManager->flush();

        return $this->json('Ruche supprimé avec succès');
    }
    

}