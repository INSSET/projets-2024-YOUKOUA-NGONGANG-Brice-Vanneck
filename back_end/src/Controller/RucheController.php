<?php

namespace App\Controller;
use App\Entity\Ruche;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/ruche/')]
class RucheController extends AbstractController
{

    private $rucheRepository;

   private $userRepository;
    private $user;
    public function __construct(EntityManagerInterface $entityManager,Security $security)
    {
        $this->rucheRepository = $entityManager->getRepository(Ruche::class);

        $this->userRepository = $entityManager->getRepository(User::class);

        $user = $security->getUser()->getUserIdentifier();

        $this->user = $this->userRepository->findOneBy([
            'email' => $user
        ]);

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
        $data=json_decode($request->getContent(),true);



        $ruche->setLibelle($data['libelle']);
        $ruche->setLatitude($data['latitude']);
        $ruche->setLongitude($data['longitude']);
        $ruche->setUser($this->user);
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