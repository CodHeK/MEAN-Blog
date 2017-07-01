(function() {
	angular
		.module("BlogApp", [])
		.controller("BlogController", BlogController);

	function BlogController($scope, $http) {
		$scope.createPost = createPost;
		$scope.postDelete = postDelete;
		$scope.postEdit = postEdit;
		$scope.updatePost = updatePost;

		function init() {
			getAllPosts();
		}
		init();

		function createPost(post) {
			console.log(post);
			$http
				.post("/api/blogpost", post)
				.success(getAllPosts);
		}

		//now fetch the posts
		function getAllPosts() {
			$http
				.get("/api/blogpost")
				.success(function(posts) {
					$scope.posts = posts;
				});
		}

		function postDelete(postId) {
			$http
				.delete("/api/blogpost/"+postId)
				.success(getAllPosts);
		}


		function postEdit(postId) {
			$http
				.get("/api/blogpost/"+postId)
				.success(function(post) {
					$scope.post = post;
				});	
		}

		function updatePost(post) {
			$http
				.put("/api/blogpost/"+post._id, post)
				.success(getAllPosts);
		}

	}
})();